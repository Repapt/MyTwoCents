from django.db import models

# Create your models here.
class Survey(models.Model):
	revenue = models.DecimalField(decimal_places=2, max_digits=8)
	savings = models.DecimalField(decimal_places=2, max_digits=8)
	start_of_pay = models.DateField()

	frequency_of_pay = models.IntegerField()


