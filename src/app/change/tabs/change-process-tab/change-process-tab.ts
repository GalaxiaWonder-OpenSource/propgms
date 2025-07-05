import { Component } from '@angular/core';

import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import {CreateChangeProcessForm} from '../../components/create-change-process-form/create-change-process-form';
import {CreateChangeProcessResource} from '../../resources/create-change-process-resource';
import {ChangeProcessService} from '../../services/change-process-service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-change-process-tab',
  standalone: true,
  imports: [CreateChangeProcessForm, TranslatePipe],
  templateUrl: './change-process-tab.html',
  styleUrl: './change-process-tab.css'
})
export class ChangeProcessTab extends BaseTab {
  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private changeProcessService: ChangeProcessService
  ) {
    super(layoutEvents, appContextService);
  }

  handleSubmit(data: Partial<{ justification: string }>): void {
    const project = this.getProjectOrThrow();
    const resource: CreateChangeProcessResource = {
      projectId: project.id,
      justification: data.justification ?? ''
    };

    this.changeProcessService.createChangeProcess(resource).subscribe({
      next: (changeProcess) => {
        this.emitSnackbar("success", "project-tracking.change-process.create-success");
      },
      error: (err) => {
        this.emitSnackbar("error", "project-tracking.change-process.create-failure");
      }
    });
  }
}
