provider "azurerm" {
  features {}
  subscription_id = "62e994c5-446e-45c1-b283-d310c051240f"

}

resource "azurerm_resource_group" "example_group" {
  name     = "aks_is_shit"
  location = "italynorth"

}


resource "azurerm_kubernetes_cluster" "aks" {
  name                = "op_cluster"
  location            = "italynorth"
  resource_group_name = "aks_is_shit"
  dns_prefix = "yes-dns"

  default_node_pool {
    name            = "testnodepool"
    node_count      = 1
    vm_size         = "Standard_DS2_v2"
  }

  identity { #how aks access to azure recources
      type = "SystemAssigned"
  }


  tags = {
    environment = "dev"
  }

}
