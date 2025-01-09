#!/bin/bash

helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/

helm upgrade --install kubernetes-dashboard \
kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace \
kubernetes-dashboard

kubectl create -f dashboard_services/dashboard‑serviceaccount.yml

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace


kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml

kubectl create namespace drawini

kubectl config set-context --current --namespace=drawini
