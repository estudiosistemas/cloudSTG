from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Profile

# User Serializer


# PROFILE SERIALIZER
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('image', 'telefono', 'domicilio', 'agencias')


class ImgProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('image',)

    def update(self, instance, validated_data):
        instance.image = validated_data['image']
        instance.save()
        return instance


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('domicilio', 'telefono', )

    # def update(self, instance, validated_data):
    #     instance.domicilio = validated_data['domicilio']
    #     instance.telefono = validated_data['telefono']
    #     instance.save()
    #     return instance


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'profile')


class UserListSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField('get_fullname')
    avatar = serializers.SerializerMethodField('get_avatar')

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'fullname', 'avatar')

    def get_fullname(self, user):
        fullname = user.first_name + " " + user.last_name
        return fullname

    def get_avatar(self, user):
        avatar = user.profile.image.url
        return avatar


class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer(many=False)

    class Meta:
        model = User
        fields = ('username', 'email',
                  'first_name', 'last_name', 'profile')

    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.save()
        usr_id = User.objects.values_list('id', flat=True).get(
            username=validated_data['username'])
        print(usr_id)
        profile_data = validated_data['profile']
        print(profile_data['domicilio'])
        Profile.objects.filter(user_id=usr_id).update(
            domicilio=profile_data['domicilio'], telefono=profile_data['telefono'])
        return instance


# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales Incorrectas")
