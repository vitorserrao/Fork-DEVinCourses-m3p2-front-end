import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITraining } from '../../../../models/training';
import { AlertService } from '../../services/alert/alert.service';
import { TrainingService } from '../../../../services/training/training.service';
import { TrainingComponent } from '../../pages/training/training.component';
import { IUser } from 'src/app/models/user';
import { IRegistration } from 'src/app/models/registration';

@Component({
  selector: 'pro-item-my-training',
  templateUrl: './item-my-training.component.html',
  styleUrls: ['./item-my-training.component.scss'],
})
export class ItemMyTrainingComponent implements OnInit {
  userId!: IUser;
  UserActive!: IUser;
  IdTraningRemove!: ITraining;
  training: any;
  IdTest!: number;

  @Input()
  item: ITraining = {
    id: 0,
    url: '',
    title: '',
    description: '',
    teacher: '',
    duration: 0,
    active: true,
    category: '',
    date: new Date(),
    modules: [],
  };

  constructor(
    private alertService: AlertService,
    private trainingService: TrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  getUserActive() {
    this.trainingService
      .getUserByToken(this.trainingService.token)
      .subscribe((user: IUser) => {
        return (this.UserActive = user);
      });
  }
  getSqlTraining(idT: number, idU: IUser) {
    this.trainingService.getTraining().subscribe((trainings) => {
      this.training = trainings;
      const result = this.training.filter((userT: any) => {
        return userT.userId == idU.id && userT.trainingId == idT;
      });
      this.IdTest = result[0].id;
      this.alertService.alertDeleteTraining(this.IdTest);
    });
  }
  removeTraining(IdTraning: ITraining) {
    this.IdTraningRemove = IdTraning;
    this.trainingService
      .getUserByToken(this.trainingService.token)
      .subscribe((user: IUser) => {
        this.UserActive = user;
        this.getSqlTraining(this.IdTraningRemove.id, this.UserActive);
      });
  }

  selectTraining(training: ITraining) {
    this.trainingService.training = training;
    this.router.navigate(['home/video']);
    this.refreshRecentTraining(1, Date.now());
  }

  refreshRecentTraining(id: number, dateRefresh: number) {
    this.trainingService.PatchRecentTrainingsByUser(id, dateRefresh);
  }

  formatarDuracao(duracao: number): any {
    return duracao.toString().replace(':00:00', '');
  }
}
