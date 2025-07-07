from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from characters.models import Character
from openai import OpenAI
import openai
from django.conf import settings

# Create your views here.

class ChatAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        message = request.data.get('message')
        character_id = request.data.get('character_id')
        
        # Enhanced logging
        print('Received request data:', request.data)
        print('Received message:', message)
        print('Received character_id:', character_id)
        print('Message type:', type(message), 'Character ID type:', type(character_id))
        
        # Check if fields are missing or blank
        if message is None or character_id is None:
            return Response({
                'error': 'message and character_id are required.',
                'received_data': request.data
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not str(message).strip() or not str(character_id).strip():
            return Response({
                'error': 'message and character_id cannot be blank.',
                'received_data': request.data
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            character = Character.objects.get(id=character_id)
        except Character.DoesNotExist:
            return Response({'error': 'Character not found.'}, status=status.HTTP_404_NOT_FOUND)
        system_prompt = character.personality_prompt
        try:
            api_key = getattr(settings, 'OPENAI_API_KEY', None)
            if not api_key:
                # Fallback to mock response if API key is not present
                mock_reply = f"You said: {message} 🤖 [Mock AI]"
                return Response({'reply': mock_reply})
            
            # Set the OpenAI API key
            openai.api_key = settings.OPENAI_API_KEY
            
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message},
                ],
                max_tokens=256,
            )
            ai_reply = response.choices[0].message.content
            return Response({'reply': ai_reply})
        except Exception as e:
            print(f"OpenAI API error: {str(e)}")
            # Fallback to mock response on error
            mock_reply = f"You said: {message} 🤖 [Mock AI]"
            return Response({'reply': mock_reply})
