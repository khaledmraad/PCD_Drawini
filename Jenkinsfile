pipeline {
    agent any

    tools{
        maven 'M3'
        git 'git'
    }

    stages {
        stage('cloning repo') {
            steps {
                git branch: 'main', url:'https://github.com/khaledmraad/PCD_Drawini.git'
            }
        }
        
        stage('compile and test') {
            steps {
                sh script:'''
                  #!/bin/bash
                  cd SpringBackend_V2.0
                  mvn -Dmaven.test.failure.ignore clean package
                '''
            }
        }
        
        
        stage('create docker image') {
            steps {
                sh script:'''
                  #!/bin/bash
                  cd SpringBackend_V2.0
                  docker build -t khaledmraadtn/pcd_drawini:latest ./Dockerfile2
                '''
            }
        }
        
        stage('deploy to docker hub') {
            steps {
                script {
                   withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'password', usernameVariable: 'username')]) {
                      sh "docker login -u ${username} -p ${password}"
                      sh "docker push khaledmraad/pcd_drawini:latest "
                   }
                }
            }
        }
        
        
    }
}

