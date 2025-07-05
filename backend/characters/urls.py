from django.urls import path
from .views import CharacterListAPIView
 
urlpatterns = [
    path('api/characters/', CharacterListAPIView.as_view(), name='character-list'),
] 