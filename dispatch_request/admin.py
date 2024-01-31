from django.contrib import admin
from django.contrib.auth.admin import UserAdmin  as BaseUserAdmin
# Register your models here.
from .models import User

class UserAdmin(BaseUserAdmin):
    ''' Custom user admin page '''
    list_display = ('username', 'password', 'fname', 'mname', 'lname', 'access_level', 'is_staff', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('username', 'fname', 'mname', 'lname', 'access_level')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'fname', 'mname', 'lname', 'access_level', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

admin.site.register(User, UserAdmin)