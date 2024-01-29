''' serializer module '''
# from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import VehicleRequest

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     ''' user serializer class '''
#     class Meta:
#         ''' user serizlizer meta '''
#         model = User
#         fields = ['url', 'username', 'email', 'groups']

# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     ''' group serielizer class '''
#     model = Group
#     fields = ['url', 'name']

class VehicleRequestSerializer(serializers.ModelSerializer):
    '''Vehicle request serializer class'''
    class Meta:
        model = VehicleRequest
        fields = '__all__'
