import { EntityState } from '@ngrx/entity';

import { GameObject } from 'app/core/models';

// export interface GameObjectEntity {
//   id: string;
//   gameObject: GameObject;
// }

export interface GameObjectsState extends EntityState<GameObject> { }
