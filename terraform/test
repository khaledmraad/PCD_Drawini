pipeline {
    agent any
    tools {
    terraform 'tf'
    }
    environment {
        TF_HOME = tool('tf')
        TF_IN_AUTOMATION = 'true'
        PATH = "$TF_HOME:$PATH"
    }

    stages {
    //     stage('Terraform Init') {
    //     steps {
    //       withCredentials([azureServicePrincipal(
    //                 credentialsId: 'SA_TF',
    //                 subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
    //                 clientIdVariable: 'ARM_CLIENT_ID',
    //                 clientSecretVariable: 'ARM_CLIENT_SECRET',
    //                 tenantIdVariable: 'ARM_TENANT_ID'
    //       )]) {
    //       sh '''
    //                     echo "Initialising Terraform and export variables to TF by init.sh"
    //                     . ./init.sh
    //                     terraform init -upgrade -reconfigure
    //                     '''
    //       }
    //     }
    //   }
    //   stage('Terraform Plan') {
    //     steps {
    //       withCredentials([azureServicePrincipal(
    //                 credentialsId: 'SA_TF',
    //                 subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
    //                 clientIdVariable: 'ARM_CLIENT_ID',
    //                 clientSecretVariable: 'ARM_CLIENT_SECRET',
    //                 tenantIdVariable: 'ARM_TENANT_ID'
    //       )]) {
    //         sh '''
    //                     echo "Creating Terraform Plan wwith SP variables"
    //                     terraform  plan -var "client_id=$ARM_CLIENT_ID" -var "client_secret=$ARM_CLIENT_SECRET" -var "subscription_id=$ARM_SUBSCRIPTION_ID" -var "tenant_id=$ARM_TENANT_ID"
    //                     '''
    //       }
    //     }
    //   }
    //   stage('Terraform Apply') {
    //     steps {
    //       withCredentials([azureServicePrincipal(
    //                 credentialsId: 'SA_TF',
    //                 subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
    //                 clientIdVariable: 'ARM_CLIENT_ID',
    //                 clientSecretVariable: 'ARM_CLIENT_SECRET',
    //                 tenantIdVariable: 'ARM_TENANT_ID'
    //       )]) {
    //       sh '''
    //                     echo "Applying the plan with auto approve and SP variables"
    //                     terraform apply -auto-approve -var "client_id=$ARM_CLIENT_ID" -var "client_secret=$ARM_CLIENT_SECRET" -var "subscription_id=$ARM_SUBSCRIPTION_ID" -var "tenant_id=$ARM_TENANT_ID"
    //                     ls -lah
    //                     '''
    //       }
    //     }
    //   }
      stage('Terraform Destroy') {
        steps {
          withCredentials([azureServicePrincipal(
                    credentialsId: 'SA_TF',
                    subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
                    clientIdVariable: 'ARM_CLIENT_ID',
                    clientSecretVariable: 'ARM_CLIENT_SECRET',
                    tenantIdVariable: 'ARM_TENANT_ID'
          )]) {
          sh '''
                        echo "Initialising Terraform Destroy"
                        terraform destroy -auto-approve -var "client_id=$ARM_CLIENT_ID" -var "client_secret=$ARM_CLIENT_SECRET" -var "subscription_id=$ARM_SUBSCRIPTION_ID" -var "tenant_id=$ARM_TENANT_ID"
                        ls -lah
                        '''
          }
        }
      }
    }
}
