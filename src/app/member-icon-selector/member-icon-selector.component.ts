import { Component, forwardRef } from '@angular/core';
import { iconsNames } from './member-icon-names';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const MEMBER_ICON_SELECTOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MemberIconSelectorComponent),
  multi: true,
};

@Component({
  selector: 'bot-member-icon-selector',
  templateUrl: './member-icon-selector.component.html',
  styleUrls: ['./member-icon-selector.component.css'],
  providers: [MEMBER_ICON_SELECTOR_VALUE_ACCESSOR],
})
export class MemberIconSelectorComponent implements ControlValueAccessor {
  memberIcons = iconsNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null;
  onChange!: Function;
  onTouched!: Function;

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }
  showIcons() {
    this.showAllIcons = true;
  }

  writeValue(icon: string | null): void {
    this.selectedIcon = icon;
    if (icon && icon !== '') {
      this.showAllIcons = false;
    } else {
      this.showAllIcons = true;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => {
      fn(icon);
    };
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
}
