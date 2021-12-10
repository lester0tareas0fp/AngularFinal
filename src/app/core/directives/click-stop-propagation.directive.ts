import {Directive, HostListener} from "@angular/core";
    
@Directive({
    selector: "[click-stop-propagation]"
})
export class ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        debugger
        event.stopPropagation();
    }
}