from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Character
from .serializers import CharacterSerializer

# Create your views here.

class CharacterListAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        characters = Character.objects.all()
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
