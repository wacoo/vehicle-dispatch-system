from django.contrib.auth.models import Group
from dispatch_request.models import User
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import VehicleRequest, Driver, Approval, Vehicle, Dispatch
from .serializers import VehicleRequestSerializer, DriverSerializer, ApprovalSerializer, VehicleSerializer, DispatchSerializer, GroupSerializer, UserSerializer

from rest_framework import viewsets
from .models import User, Group
from .serializers import UserSerializer, GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class UserLoginAPIView(APIView):
    permission_classes = []

    def post(self, request):
        username = request.data.get('user_id')
        password = request.data.get('password')
        print(username)
        print(password)
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        serializer = UserSerializer(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data
        })

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class DriverViewSet(viewsets.ModelViewSet):
    ''' Driver api end point view set '''
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

class DispatchViewSet(viewsets.ModelViewSet):
    ''' Dispatch api end point view set '''
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

class VehicleViewSet(viewsets.ModelViewSet):
    ''' Vehicle api end point view set '''
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

class ApprovalViewSet(viewsets.ModelViewSet):
    ''' Approval api end point view set'''
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

class VehicleRequestViewSet(viewsets.ModelViewSet):
    ''' vehicle request api view set '''
    queryset = VehicleRequest.objects.all()
    serializer_class = VehicleRequestSerializer

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    # def create(self, request, *args, **kwargs):
    #     ''' create vehicle request '''
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save(user=request.user)

    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def update(self, request, *args, **kwargs):
    #     ''' update vehicle request '''
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)