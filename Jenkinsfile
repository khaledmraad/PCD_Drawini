pipeline {
   agent any
   stages {
      stage('clean workspace') {
      steps {
        cleanWs()
      }
    }

      stage('Checkout Code') {
         steps {
            checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/khaledmraad/PCD_Drawini.git']])
         }
      }  
      stage('terraform') {
      steps {
        sh './terraform_installer_jenkins apply -auto-approve -no-color'
      }
    }

      stage('terraform version'){
      steps{
                  sh 'terraform --version'
      }
      }
      
   }
}


// pipeline {
//     agent any
//     environment {
//         AWS_DEFAULT_REGION = 'your-aws-region'
//     }
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }
//         stage('Terraform Init') {
//             steps {
//                 script {
//                     sh 'terraform init'
//                 }
//             }
//         }
//         stage('Terraform Plan') {
//             steps {
//                 script {
//                     sh 'terraform plan -out=tfplan'
//                 }
//             }
//         }
//         stage('Terraform Apply') {
//             steps {
//                 script {
//                     sh 'terraform apply -auto-approve tfplan'
//                 }
//             }
//         }
//         stage('Upload State to S3') {
//             steps {
//                 script {
//                     sh '   -name'
//                 }
//             }
//         }
//     }
//     post {
//         always {
//             cleanWs()
//         }
//     }
// }




// pipeline{
//    agent any
//    stages{
//       stage('Compile and Test'){
//          steps{
//             git 'https://github.com/khaledmraad/PCD_Drawini.git'

//             sh 'mvn clean install'

//          }
//       }
//       stage('test'){
//          steps{
//             echo "testing"
//          }
//       }
//       stage('deploy'){
//          steps{
//             script {
//                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'password', usernameVariable: 'username')]) {
//                   sh "docker login -u ${username} -p ${password}"
//                   sh "docker push khaledmraad/pcd_drawini:latest "
//                }
//             }
//             echo "deploying"
//          }
//       }
//    }
// }