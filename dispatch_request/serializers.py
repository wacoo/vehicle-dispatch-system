''' serializer module '''
from django.contrib.auth.models import Group
from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import VehicleRequest, Driver, Approval, Vehicle, Dispatch, Refuel

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
        fields = ('id', 'request_date','requested_vehicle_type', 'destination_type', 'destination', 'estimated_duration_hrs', 'status')

class VehicleRequestSerializer(serializers.ModelSerializer):
    '''Vehicle request serializer class'''
    # user = UserLimitedSerializer(read_only=True)
    class Meta:
        ''' Request meta '''
        model = VehicleRequest
        fields = ('id', 'user', 'request_date', 'description', 'destination', 'requested_vehicle_type', 'destination_type', 'estimated_duration_hrs', 'status', 'created_at', 'updated_at')
        # read_only_fields = ('id', 'user', 'request_date', 'description', 'destination', 'requested_vehicle_type', 'destination_type', 'estimated_duration_hrs', 'created_at', 'updated_at')
    # def update(self, instance, validated_data):
    #     ''' update user custom with password hashing '''
    #     status = validated_data.get('status')
    #     if status == 'PENDING':
    #         validated_data['status'] = 'APPROVED'
    #     return super(VehicleRequestSerializer, self).update(instance, validated_data)
    
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
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            representation['manager'] = UserLimitedSerializer(instance.manager).data
            representation['request'] = VehicleRequestLimitedSerializer(instance.request).data
        except User.DoesNotExist:
            representation['user'] = None
        # except VehicleRequest.DoesNotExist:
        #     representation['request'] = None
        return representation

class DispatchSerializer(serializers.ModelSerializer):
    ''' Dispatch serializer '''
    class Meta:
        ''' Dispatch meta '''
        model = Dispatch
        fields = ('id', 'vehicle_request', 'assigned_vehicle', 'assigned_driver', 'assigned_date', 'departure_date', 'departure_time',  'departure_milage', 'departure_fuel_level', 'return_date', 'return_time', 'return_milage', 'return_fuel_level', 'dispatcher', 'created_at', 'updated_at')

        # vehicle_request  = models.ForeignKey(VehicleRequest, on_delete=models.CASCADE)
        # assigned_vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
        # assigned_driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
        # assigned_date = models.DateTimeField(default=timezone.now)
        # departure_date = models.DateField(default='')
        # departure_time = models.TimeField(default='')
        # departure_milage = models.IntegerField()
        # departure_fuel_level = models.FloatField()
        # return_date = models.DateField(blank=True, default='')
        # return_time = models.TimeField(blank=True, default='')
        # return_milage = models.IntegerField(blank=True, default=0)
        # return_fuel_level = models.FloatField(blank=True, default=0.0)
        # dispatcher = models.ForeignKey(User, on_delete=models.CASCADE)
        # created_at = models.DateTimeField(auto_now_add=True)
        # updated_at = models.DateTimeField(auto_now=True)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            representation['driver'] = DriverLimitedSerializer(instance.assigned_driver).data
            representation['vehicle'] = VehicleLimitedSerializer(instance.assigned_vehicle).data
            representation['request'] = VehicleRequestLimitedSerializer(instance.vehicle_request).data
        except Driver.DoesNotExist:
            representation['driver'] = None
        # except Vehicle.DoesNotExist:
        #     representation['vehicle'] = None
        # except VehicleRequest.DoesNotExist:
        #     representation['vehicle'] = None
        return representation

class RefuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refuel
        #fields=('vehicle', 'refuel_request_date', 'refuel_date', 'fuel_type', 'km_before_refuel', 'milage_in_km', 'km_per_liter', 'current_fuel_level', 'remark')
        fields = '__all__'