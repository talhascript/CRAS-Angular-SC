pipeline  {
    agent any
    stages {
        stage('Preparation') { 
            // Get some code from a GitHub repository
            steps{
                echo "Start pulling from github"
                git branch: 'main', url: 'https://github.com/tanchonglim/CRAS-Angular-SC.git'
            }
        }
        stage('Docker Build') {
            //build docker 
            steps {
                echo "Start docker build"
                bat 'docker compose build'
            }
        }
        stage('Docker Run Container') {
            //build docker 
            steps {
                echo "Start running docker container"
                bat 'docker compose up -d'
            }
        }
    }

}
