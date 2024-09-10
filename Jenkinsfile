pipeline {
    agent any

    tools{
        maven 'M3'
        git 'git'

    }
    environment {
        SCANNER_HOME=tool 'sonar'
    }


    stages {
        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }
        
        
        stage('cloning repo') {
            steps {
                git branch: 'main', url:'https://github.com/khaledmraad/PCD_Drawini.git'
            }
        }
        
        stage('trigger Frontend Pipeline') {
            steps {
                build job: "PCD_Drawini_fontend", wait: false
            }
        }

        
        stage('Package') {
            steps {
                sh 'cd SpringBackend_V2.0 && mvn package  -Dmaven.test.skip=true'    
            }
        }
        
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh 'cd SpringBackend_V2.0 && mvn package -Dmaven.test.skip=true sonar:sonar -Dsonar.projectName="Drawini Spring Backend" '
                }
            }
        }


    //   stage("quality gate"){
    //       steps {
    //             script {
    //                 waitForQualityGate abortPipeline: false, credentialsId: 'sonarqube' 
    //             }
    //         } 
    //     }


        
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
                  pwd
                  cd SpringBackend_V2.0
                  docker build -t khaledmraadtn/drawini_spring_backend:latest -f ./Dockerfile2 .
                '''
            }
        }
        
        stage('deploy to docker hub') {
            steps {
                script {
                   withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'password', usernameVariable: 'username')]) {
                      sh "docker login -u ${username} -p ${password}"
                      sh "docker push khaledmraadtn/drawini_spring_backend:latest "
                   }
                }
            }
        }
        
        
    }
}

