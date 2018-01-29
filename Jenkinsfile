pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
        sh '''xcode-select --install
sudo xcode-select --switch /Library/Developer/CommandLineTools
npm run build'''
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