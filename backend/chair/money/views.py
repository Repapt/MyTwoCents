from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from money.models import Survey
from decimal import *
import datetime
# Create your views here.

class moneyScore(APIView):

	def get(self, request):
		s = Survey.objects.all()[0]
		try:
			cost = Decimal(request.GET["cost"])
		except Exception as e:
			return Response("Please specify the cost in a numerical format")
		print(s.purchase_difference())
		return Response(algorithm(vals=s.__dict__))

	def post(self, request):
		args = ["revenue", "savings", "fpay"]
		s = Survey()
		data = []

		
		for arg in args:
			data.append(request.data[arg])

		s.revenue, s.savings, s.frequency_of_pay = data

		s.start_of_pay = datetime.datetime.strptime(request.data["sdate"], "%Y-%m-%d").date()

		s.save()
		

		print(request.data)
		pass

def algorithm(vals=[]):
	print(vals)
	return 200.0