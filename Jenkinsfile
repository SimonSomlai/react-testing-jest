pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
        sh '
        npm i 
        npm run build
      }
    }
    stage('Test') {
      steps {
        echo 'Testing..'
        sh 'npm run test'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}