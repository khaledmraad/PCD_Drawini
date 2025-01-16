pipeline {
    agent any

    stages {
        
        stage('terraform init') {
            steps {
                sh 'cd terraform && terraform init'
            }
        }
        
        stage('terraform apply') {
            steps {
                sh 'cd terraform && terraform apply --auto-approve'
            }
        }
        

        stage('trust me') {
            steps {
                script {
                    sh 'echo "Running mkdir -p ~/.ssh"'
                    sh 'mkdir -p ~/.ssh && echo "mkdir ran"'
                    sh '''
                        if [ ! -f ~/.ssh/known_hosts ]; then
                          touch ~/.ssh/known_hosts && echo "known_hosts file created"
                        fi
                    '''
                    sh 'echo "Running ssh-keyscan"'
                    sh '''
                        ssh-keyscan -H 10.224.0.4 >> ~/.ssh/known_hosts && echo "ssh-keyscan successful" || exit 0
                    '''
                    sh 'export ANSIBLE_HOST_KEY_CHECKING=False && echo "ANSIBLE_HOST_KEY_CHECKING set to False"'

                     sh '''
                        echo "Host *" >> ~/.ssh/config
                        echo "    StrictHostKeyChecking no" >> ~/.ssh/config
                        echo "    UserKnownHostsFile=/dev/null" >> ~/.ssh/config
                    '''
                }
            }
        }

        stage('ansible') {
            steps {
                script {
                    sh '''
                        cd ansible
                        echo "Running ansible-playbook"
                        ansible-playbook -i inventory deploy.yml -e "jump_box_public_ip=$(cd ../terraform && terraform output jump_box_public_ip)"
                    '''
                }
            }
        }
    }
}
