# from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import VehicleRequest
from .serializers import VehicleRequestSerializer
# from dispatch_request.serializers import GroupSerializer, UserSerializer
# class UserViewSet(viewsets.ModelViewSet):
#     ''' an API endpont that allows users to be viewed or edited.'''
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class GroupViewSet(viewsets.ModelViewSet):
#     ''' an API end point that allows groups to be viewed pr edited.'''
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]

class VehicleRequestViewSet(viewsets.ModelViewSet):
    ''' vehicle request api view set '''
    queryset = VehicleRequest.objects.all()
    serializer_class = VehicleRequestSerializer

    def create(self, request, *args, **kwargs):
        ''' create vehicle request '''
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        ''' update vehicle request '''
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)