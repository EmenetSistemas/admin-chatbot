import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsBotComponent } from './chats-bot.component';

describe('ChatsBotComponent', () => {
  let component: ChatsBotComponent;
  let fixture: ComponentFixture<ChatsBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsBotComponent]
    });
    fixture = TestBed.createComponent(ChatsBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
