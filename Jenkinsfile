pipeline {
  agent any
  stages {
    stage('1 - Build') {
      steps {
        echo 'Building..'
        sh '''npm i 
        npm run build'''
      }
    }
    stage('2 - Test') {
      steps {
        echo 'Testing..'
        sh 'npm run test'
      }
    }
    stage('3 - Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}