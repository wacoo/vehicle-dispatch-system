''' serializer module '''
# from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import VehicleRequest, Driver, Approval, Vehicle, Dispatch

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
        ''' Request meta '''
        model = VehicleRequest
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    ''' Drivers serializer '''
    class Meta:
        ''' Driver meta '''
        model= Driver
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    ''' Vehicle serializer '''
    class Meta:
        ''' Vehicle meta '''
        model= Vehicle
        fields = '__all__'

class ApprovalSerializer(serializers.ModelSerializer):
    ''' Approval serializer '''
    class Meta:
        ''' Approval meta '''
        model = Approval
        fields = '__all__'

class DispatchSerializer(serializers.ModelSerializer):
    ''' Dispatch serializer '''
    class Meta:
        ''' Dispatch meta '''
        model = Dispatch
        fields = '__all__'