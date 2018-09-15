from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from money.models import Survey
from decimal import *
# Create your views here.

class moneyScore(APIView):

	def get(self, request):
		s = Survey.objects.all()[0]
		try:
			cost = Decimal(request.GET["cost"])
		except Exception as e:
			return Response("Please specify the cost in a numerical format")
		return Response(algorithm(vals=s.__dict__))

	def post(self, request):
		s = Survey()

		pass


def algorithm(vals=[]):
	print(vals)
	return 200.0