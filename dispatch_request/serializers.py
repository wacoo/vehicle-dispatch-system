''' serializer module '''
from django.contrib.auth.models import Group
from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import VehicleRequest, Driver, Approval, Vehicle, Dispatch

class UserSerializer(serializers.ModelSerializer):
    ''' user serializer class '''
    password = serializers.CharField(write_only=True)

    class Meta:
        ''' user serialization meta '''
        model = User
        fields = ('id', 'username', 'fname', 'mname', 'lname', 'access_level', 'password', 'is_staff', 'is_superuser')

    def create(self, validated_data):
        ''' create user custom with password hashing '''
        is_superuser = validated_data.get('is_superuser', False)
        validated_data['password'] = make_password(validated_data.get('password'))
        if is_superuser:
            validated_data['is_staff'] = True
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        ''' update user custom with password hashing '''
        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)
        return super(UserSerializer, self).update(instance, validated_data)

class GroupSerializer(serializers.ModelSerializer):
    ''' group serielizer class '''
    class Meta:
        ''' group serizlizer meta '''
        model = Group
        fields = '__all__'

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