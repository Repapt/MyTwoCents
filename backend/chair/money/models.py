from django.db import models
import datedelta
import datetime
# Create your models here.
class Survey(models.Model):
	revenue = models.DecimalField(decimal_places=2, max_digits=8)
	savings = models.DecimalField(decimal_places=2, max_digits=8)
	start_of_pay = models.DateField()

	frequency_of_pay = models.IntegerField()

	def purchase_difference(self):
		f = datedelta.datedelta(days=self.frequency_of_pay)
		t = datetime.datetime.now().date()
		s = self.start_of_pay
		while (t - (s+f)).days > 0:
			s+=f

		days_left = s+f - t
		if days_left.days == 7:
			return 0
		return days_left.days 

	