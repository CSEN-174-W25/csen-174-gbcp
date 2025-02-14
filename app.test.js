// app.test.js

const { Muscle, DrawMuscle, Schedule, Login, Homepage } = require('./app');

describe('Muscle Class Tests', () => {
  let muscle;

  beforeEach(() => {
    muscle = new Muscle();
  });

  test('Test 1: set values to negative', () => {
    expect(() => muscle.setValue(-5)).toThrow("Invalid value");
  });

  test('Test 2: set value to between 1-5', () => {
    muscle.setValue(3);
    expect(muscle.value).toBe(3);
  });

  test('Test 3: set value to over 5', () => {
     expect(() => muscle.setValue(10)).toThrow("Invalid value");
  });

  test('Test 4: set front to true', () => {
    muscle.setFront(true);
    expect(muscle.isFront).toBe(true);
  });

  test('Test 5: set back to true', () => {
    muscle.setBack(true);
    expect(muscle.isBack).toBe(true);
  });
});

describe('Draw Muscle Class Tests', () => {
  let muscle;
  let drawMuscle;

  beforeEach(() => {
    muscle = new Muscle();
    drawMuscle = new DrawMuscle();
  });

  test('Test 1: nothing in back', () => {
    drawMuscle.setBack(false);
    expect(drawMuscle.draw()).toBe('Nothing to Draw');
  });

  test('Test 2: nothing in front', () => {
    muscle.setFront(false);
    expect(drawMuscle.draw()).toBe('Nothing to Draw');
  });

  test('Test 3: x negative position', () => {
    expect(() => drawMuscle.setPosition({x:-1,y:3})).toThrow("Invalid value");
  });

  test('Test 4: y pos negative', () => {
    expect(() => drawMuscle.setPosition({x:2,y:-1})).toThrow("Invalid value");
  });

  test('Test 5: test standard draw button', () => {
    drawMuscle.setBack(true);
    expect(drawMuscle.draw()).toBe('Drawing muscle');
  });
});

describe('Schedule Class Tests', () => {
  let schedule;
  let muscle;

  beforeEach(() => {
    schedule = new Schedule();
    muscle = new Muscle();
  });

  test('Test 1: Add to Schedule', () => {
    schedule.addToSchedule(muscle);
    expect(schedule.schedule.length).toBe(1);
  });

  test('Test 2: Clear Schedule', () => {
    schedule.clearSchedule();
    expect(schedule.schedule.length).toBe(0);
  });

  test('Test 3: Clear Schedule while empty', () => {
    schedule.clearSchedule();
    schedule.clearSchedule();
    expect(schedule.schedule.length).toBe(0);
  });

  test('Test 4: Remove Specific muscle from schedule', () => {
    schedule.addToSchedule(muscle);
    schedule.removeFromSchedule(muscle);
    expect(schedule.schedule.length).toBe(0);
  });

  test('Test 5: Add muscle to schedule again (while its already there)', () => {
    schedule.addToSchedule(muscle);
    schedule.addToSchedule(muscle); // Adding same muscle again
    expect(schedule.schedule.length).toBe(1);
  });
});

describe('Login Class Tests', () => {
  let login;

  beforeEach(() => {
    login = new Login();
  });

  test('Test 1: login with nothing saved', () => {
    expect(login.login('user3', 'password3')).toBe('Invalid login');
  });

  test('Test 2: login with valid account', () => {
    expect(login.login('user1', 'password1')).toBe('Login successful');
  });

  test('Test 3: login with invalid account', () => {
    expect(login.login('user1', 'wrongpass')).toBe('Invalid login');
  });

  test('Test 4: valid account wrong pass', () => {
    expect(login.login('user2', 'wrongpass')).toBe('Invalid login');
  });

  test('Test 5: valid account with another accounts pass', () => {
    expect(login.login('user1', 'password2')).toBe('Invalid login');
  });
});

describe('Homepage Class Tests', () => {
  let homepage;
  let schedule;

  beforeEach(() => {
    homepage = new Homepage();
    schedule = new Schedule();
  });

  test('Test 1: login button works', () => {
    expect(homepage.loginButtonWorks()).toBe('Login button works');
  });

  test('Test 2: schedule works', () => {
    expect(homepage.scheduleWorks()).toBe('No muscles in schedule');
  });

  test('Test 3: google calendar works', () => {
    expect(homepage.googleCalendarWorks()).toBe('Google Calendar works');
  });

  test('Test 4: sim works', () => {
    expect(homepage.simWorks()).toBe('Sim works');
  });

  test('Test 5: sign up', () => {
    expect(homepage.signUp()).toBe('Sign up successful');
  });
});
