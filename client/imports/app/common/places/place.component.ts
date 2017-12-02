import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {IPlace, ILengthUnit} from "../../../../../imports/models";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-place',
    templateUrl: './place.component.html',
    //styleUrls: ['./home.component.scss']
})
export class PlaceComponent {
    @Input() place: IPlace;
    @Input() lengthUnits: ILengthUnit[];

    @Input('group')
    public placeForm: FormGroup;

    /*
    lengthUnits: ILengthUnit[];
    selectedUnit: ILengthUnit;


    //placeValue:string;
    //lengthValue:string;
    //@Output() onChange = new EventEmitter();
    @Output()
    selectedLength: EventEmitter<string> = new EventEmitter<string>();

    //ngOnChanges(changes: SimpleChanges): void {throw new Error("Method not implemented.");}

    onChangeLengthUnit(change) {
        this.selectedLength.emit(this.selectedUnit._id);
    }

    ngOnInit(): void {
        this.getLengthUnits();
    }

    private getLengthUnits() {
        MeteorObservable.subscribe('length-units').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.lengthUnits = this.findLengthUnits();
                this.selectedUnit = this.lengthUnits[0];
            });
        });
    }

    private findLengthUnits(): ILengthUnit[] {
        return LengthUnits.find().fetch();
    }

*/
}
