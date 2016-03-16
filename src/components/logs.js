import config from 'app/core/config';

export class LogsPageCtrl {

  constructor() {
    this.name = config.bootData.user.name;
  }

}
LogsPageCtrl.templateUrl = 'components/logs.html';


