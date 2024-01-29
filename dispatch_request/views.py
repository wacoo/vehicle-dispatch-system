# from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
# from dispatch_request.serializers import GroupSerializer, UserSerializer
from django.shortcuts import render

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

