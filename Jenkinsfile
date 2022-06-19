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
                bat 'docker compose down'
                bat 'docker compose up -d'
            }
        }
        stage("Testing"){
            //run Jmeter 
            //display performance report
            steps{
                sleep time: 10000, unit: 'MILLISECONDS'
                echo "Start testing"
                dir("C:\\Program Files (x86)\\apache-jmeter-5.4.3\\bin"){
                    bat 'jmeter -jjmeter.save.saveservice.output_format=xml -n -t "C:\\Users\\User\\Desktop\\SC project 1\\CRAS-Angular-SC\\test.jmx" -l "C:\\Users\\User\\Desktop\\SC project 1\\CRAS-Angular-SC\\result.xml"'
                }
                perfReport 'C:\\Users\\User\\Desktop\\SC project 1\\CRAS-Angular-SC\\result.xml'
            }
        }
    }
}
