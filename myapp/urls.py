from django.urls import path
from . import views
from myapp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('index/', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('contactus/', views.contactus, name='contactus'),

    path('scopelogin/', views.scopelogin, name='scopelogin'),
    path('firstlogin/', views.firstlogin, name='firstlogin'),
    path('forgotpassword/', views.forgotpassword, name='forgotpassword'),

    path('createpassword/', views.createpassword, name='createpassword'),
    path('reset_password/', views.resetpass, name='reset_password'),
    path('verify/<uuid:token>/',views.verify,name='verify'),
    path('dashboard/', views.dashboard, name='dashboard') ,
    path('signup_course/<int:course_id>/', views.signedup_course, name='signup_course'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('change_password/', views.change_password, name='change_password'),
    path('logout/', views.logout_user, name='student_logout'),
    path('signedup_course/<int:course_id>',views.signedup_course,name='signedup_course'),
    path('edit_profile',views.edit_profile,name='edit_profile'),
    path('change_password',views.change_password,name='change_password'),
    path('logout_user',views.logout_user,name='logout_user'),
    path('remove_course/<int:course_id>',views.remove_course,name='remove_course')

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)