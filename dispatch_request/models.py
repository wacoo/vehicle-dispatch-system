from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

class CustomUserManager(UserManager):
  ''' custom user class '''
  def _create_user(self, username, password, **extra_fields):
    ''' create user indirect method '''
    if not username:
        raise ValueError('The username must be set')
    user = self.model(username=username, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, username=None, password=None, **extra_fields):
    ''' create regular user method '''
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(username, password, **extra_fields)

  def create_superuser(self, username=None, password=None, **extra_fields):
    ''' create superuser method '''
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self._create_user(username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
  ''' user class '''
  username = models.CharField(max_length=10, unique=True)
  fname = models.CharField(max_length=50, blank=False)
  mname = models.CharField(max_length=50, blank=False)
  lname = models.CharField(max_length=50, blank=True, default='')
  access_level = models.IntegerField(default=0)
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  date_joined = models.DateTimeField(default=timezone.now)
  last_login = models.DateField(blank=True, null=True)
    
  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = []

  objects = CustomUserManager()

  class Meta:
    verbose_name = 'User'
    verbose_name_plural = 'Users'

  def get_full_name(self):
    return "{} {} {}".format(self.fname, self.mname, self.lname)
    
  def get_short_name(self):
    ''' return first name '''
    return self.fname
    
  def __str__(self):
    ''' return username  '''
    return self.username

class VehicleRequest(models.Model):
  ACTIVE = 'active'
  PENDING = 'pending'
  COMPLETE = 'complete'

  CAR = 'car'
  BUS = 'bus'
  MINIBUS = 'minibus'
  VAN = 'van'
  TRUCK = 'truck'
  BIKE = 'bike'

  CHOICES = (
      (PENDING, 'Pending'),
      (ACTIVE, 'Active'),
      (COMPLETE, 'Complete')
  )

  CHOICES_VTYPES = (
    (CAR, 'Car'),
    (BUS, 'Bus'),
    (MINIBUS, 'Minibus'),
    (VAN, 'Van'),
    (TRUCK, 'Truck'),
    (BIKE, 'Bike')
  )

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  request_date = models.DateTimeField(default=timezone.now)
  description = models.CharField(max_length=500)
  requested_vehicle_type = models.CharField(max_length=50, choices=CHOICES_VTYPES, default=PENDING)
  destination = models.CharField(max_length=200)
  estimated_duration = models.IntegerField(default=0)
  status = models.CharField(max_length=50, choices=CHOICES, default=PENDING)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)