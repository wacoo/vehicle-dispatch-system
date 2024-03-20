from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager, Group
from django.utils import timezone
from enum import Enum

class CustomUserManager(BaseUserManager):
  ''' custom user class '''
  def _create_user(self, username, fname, mname, lname, department, access_level, password, phone_number, **extra_fields):
    ''' create user indirect method '''
    if not username:
            raise ValueError('The username must be set')

    user = self.model(
        username=username,
        fname=fname,
        mname=mname,
        lname=lname,
        department=department,
        phone_number=phone_number,
        access_level=access_level,
        **extra_fields
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, username=None, fname=None, mname=None, lname=None, department=None, access_level=None, password=None, phone_number=None, **extra_fields):
    ''' create regular user method '''
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(username, fname, mname, lname, department, access_level, password, phone_number, **extra_fields)

def create_superuser(self, username=None, fname=None, mname=None, lname=None, department=None, access_level=None, password=None, phone_number=None, **extra_fields):
    ''' create superuser method '''
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    if extra_fields.get('is_staff') is not True:
        raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
        raise ValueError('Superuser must have is_superuser=True.')
    
    return self._create_user(username, fname, mname, lname, department, access_level, password, phone_number, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
  ''' user class '''
  username = models.CharField(max_length=10, unique=True)
  fname = models.CharField(max_length=50, blank=False)
  mname = models.CharField(max_length=50, blank=False)
  lname = models.CharField(max_length=50, blank=True, default='')
  department = models.CharField(max_length=200, blank=False)
  access_level = models.IntegerField(default=0)# 0 = requester, 1= appover, 2 = dispatcher, 3 = admin
  phone_number = models.CharField(max_length=50, blank=True, default='')
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  date_joined = models.DateTimeField(default=timezone.now)
  last_login = models.DateField(blank=True, null=True)
    
  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = []

  objects = CustomUserManager()
  groups = models.ManyToManyField(Group, blank=True)

  class Meta:
    ''' User meta '''
    verbose_name = 'User'
    verbose_name_plural = 'Users'

  def get_full_name(self):
    ''' Get full name '''
    return "{} {} {}".format(self.fname, self.mname, self.lname)
    
  def get_short_name(self):
    ''' Return first name '''
    return self.fname
    
  def __str__(self):
    ''' return username  '''
    return self.username

class VehicleRequestStatus(Enum):
    ''' Status enumarable '''
    PENDING = 'PENDING'
    APPROVED = 'APPROVED'
    REJECTED = 'REJECTED'
    ACTIVE = 'ACTIVE'
    COMPLETE = 'COMPLETE'

class VehicleType(Enum):
    ''' Vehicle type enumerable '''
    CAR = 'CAR'
    BUS = 'BUS'
    MINIBUS = 'MINIBUS'
    VAN = 'VAN'
    TRUCK = 'TRUCK'
    BIKE = 'BIKE'

class DestinationType(Enum):
  ''' Destination type enumerable '''
  ADDIS_ABABA= 'ADDIS ABABA'
  AROUND_ADDIS_ABABA = 'AROUND ADDIS ABABA'
  REGIONAL = 'REGIONAL'

# class VehicleRequest(models.Model):
#     ''' Vehicle request class '''
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     request_date = models.DateTimeField(default=timezone.now)
#     description = models.CharField(max_length=500)
#     requested_vehicle_type = models.CharField(max_length=50, choices=[(tag, tag.value) for tag in VehicleType], default=VehicleType.CAR)
#     destination = models.CharField(max_length=200)
#     estimated_duration = models.IntegerField(default=0)
#     status = models.CharField(max_length=50, choices=[(tag, tag.value) for tag in VehicleRequestStatus], default=VehicleRequestStatus.PENDING)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
  
class VehicleRequest(models.Model):
  ''' Vehicle request class '''
  user = models.ForeignKey(User, on_delete=models.CASCADE, default='')
  request_date = models.DateTimeField(default=timezone.now)
  description = models.CharField(max_length=500)
  requested_vehicle_type = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in VehicleType], default=VehicleType.CAR.value)
  destination = models.CharField(max_length=200)
  destination_type = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in DestinationType], default=DestinationType.ADDIS_ABABA.value)
  estimated_duration_hrs = models.FloatField(default=0.00)
  status = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in VehicleRequestStatus], default=VehicleRequestStatus.PENDING.value)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class Driver(models.Model):
  ''' Drivers class '''
  fname = models.CharField(max_length=50)
  mname = models.CharField(max_length=50)
  lname = models.CharField(max_length=50, blank=True, default='')
  phone_number = models.CharField(max_length=20, unique=True)
  license_number = models.CharField(max_length=20, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class Vehicle(models.Model):
  ''' Vehicle class '''
  make = models.CharField(max_length=200)
  model = models.CharField(max_length=200)
  year = models.IntegerField()
  type = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in VehicleType], default=VehicleType.CAR.value)
  km_per_liter = models.FloatField(blank=True, default=0)
  current_milage = models.IntegerField(blank=True, default=0)
  license_plate = models.CharField(max_length=20, unique=True)
  fuel_level = models.FloatField(blank=True, default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class Approval(models.Model):
  ''' Approval class '''
  request = models.ForeignKey(VehicleRequest, on_delete=models.CASCADE)
  manager = models.ForeignKey(User, on_delete=models.CASCADE)
  approval_date = models.DateTimeField(default=timezone.now)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class Dispatch(models.Model):
  ''' Dispatch class '''
  vehicle_request  = models.ForeignKey(VehicleRequest, on_delete=models.CASCADE)
  assigned_vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
  assigned_driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
  assigned_date = models.DateTimeField(default=timezone.now)
  departure_date = models.DateField(default='')
  departure_time = models.TimeField(default='')
  departure_milage = models.IntegerField()
  departure_fuel_level = models.FloatField()
  return_date = models.DateField(blank=True, default='')
  return_time = models.TimeField(blank=True, default='')
  return_milage = models.IntegerField(blank=True, default=0)
  return_fuel_level = models.FloatField(blank=True, default=0.0)
  dispatcher = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class FuelType(Enum):
  ''' Destination type enumerable '''
  BENZINE= 'BENZINE'
  NAFTA = 'NAFTA'

class Refuel(models.Model):
  ''' Refuel class'''
  vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
  refuel_request_date = models.DateField(default='')
  refuel_date = models.DateField(default='')
  fuel_type = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in FuelType], default=FuelType.NAFTA.value)
  km_before_refuel = models.IntegerField(max_length=20)
  milage_in_km = models.IntegerField(max_length=20)
  km_per_liter = models.FloatField()
  current_fuel_level = models.FloatField()
  remark = models.CharField(max_length=500, default='')