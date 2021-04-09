import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { QuizzesModel } from './models/QuizzesModel';

const GetQuizzes = gql`query{
  quizzes {
    title,
    description,
    shuffleAnswers,
    shuffleQuestions
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allQuizzes:QuizzesModel[] = [];
  title = 'angular-graphql-apollo';
  constructor(private apollo: Apollo){}

  ngOnInit(){
    this.apollo.watchQuery<any>({
      query: GetQuizzes
    }).valueChanges
      .subscribe(({ data, loading }) => {
        console.log('loading ', loading);
        console.log('data: ', this.allQuizzes = data.quizzes)
      });
  }
}
