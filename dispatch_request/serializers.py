''' serializer module '''
from django.contrib.auth.models import Group
from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import VehicleRequest, Driver, Approval, Vehicle, Dispatch

class UserLimitedSerializer(serializers.ModelSerializer):
    ''' only for Eager fetch '''
    class Meta:
        ''' Meta '''
        model = User
        fields = ('id', 'username', 'fname', 'mname', 'lname', 'department')

class UserSerializer(serializers.ModelSerializer):
    ''' user serializer class '''
    password = serializers.CharField(write_only=True)

    class Meta:
        ''' user serialization meta '''
        model = User
        fields = ('id', 'username', 'fname', 'mname', 'lname', 'department', 'access_level', 'password', 'phone_number', 'is_staff', 'is_superuser')
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

class VehicleRequestLimitedSerializer(serializers.ModelSerializer):
    '''Vehicle request serializer class'''
    # user = UserLimitedSerializer(read_only=True)
    class Meta:
        ''' Request meta '''
        model = VehicleRequest
        fields = ('id', 'request_date','requested_vehicle_type', 'destination', 'estimated_duration', 'status')

class VehicleRequestSerializer(serializers.ModelSerializer):
    '''Vehicle request serializer class'''
    # user = UserLimitedSerializer(read_only=True)
    class Meta:
        ''' Request meta '''
        model = VehicleRequest
        fields = ('id', 'user', 'request_date', 'description', 'requested_vehicle_type', 'destination', 'estimated_duration', 'status', 'created_at', 'updated_at')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            representation['user'] = UserLimitedSerializer(instance.user).data
        except User.DoesNotExist:
            representation['user'] = None
        return representation

class DriverLimitedSerializer(serializers.ModelSerializer):
    ''' Drivers serializer '''
    class Meta:
        ''' Driver meta '''
        model= Driver
        fields = ('id', 'fname', 'mname', 'lname', 'license_number')
class DriverSerializer(serializers.ModelSerializer):
    ''' Drivers serializer '''
    class Meta:
        ''' Driver meta '''
        model= Driver
        fields = '__all__'

class VehicleLimitedSerializer(serializers.ModelSerializer):
    ''' Vehicle serializer '''
    class Meta:
        ''' Vehicle meta '''
        model= Vehicle
        fields = ('id', 'make', 'model', 'license_plate')

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
        fields = ('id', 'vehicle_request', 'assigned_vehicle', 'assigned_driver', 'assigned_date', 'departure_milage', 'departure_fuel_level', 'return_milage', 'return_fuel_level', 'created_at', 'updated_at')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            representation['driver'] = DriverLimitedSerializer(instance.assigned_driver).data
            representation['vehicle'] = VehicleLimitedSerializer(instance.assigned_vehicle).data
            representation['request'] = VehicleRequestLimitedSerializer(instance.vehicle_request).data
        except Driver.DoesNotExist:
            representation['driver'] = None
        return representation