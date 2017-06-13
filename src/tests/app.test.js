
import App from "../App.js";
import Note from "../components/note.js";

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import toJson from "enzyme-to-json"
import {mount} from "enzyme";

// GENERAL TESTING PATTERN
// - setup > action > verify action got desired result
// Why should you test? -> When refactoring/extending a big application, you might break certain features. When
// you've tested your code, you'll know which features break + the location they break at in the code.

// What should be tested? -> Depends on the type of test. Unit tests test one function which takes an input and verify they got
// valid output (most useful for complex algorithms). Integration tests test a feature/user story and ensure it works.

// CHEAT SHEET
// component.instance().props
// component.state()
// component.instance()  .updateNote(note); = this
// component.find('some-css')
// button.simulate("click")
// component.find('.note-title').node.value = "new title";

// jest.spyOn(Note.prototype, 'toggleState');
// expect(toggleState).toHaveBeenCalled()

describe('ToDo App', () => {
  let note,
    component,
    notes
  beforeEach(() => {
    // Set starting global variables
    note = {
      id: 2,
      title: 'test note',
      description: "blabla"
    };
    notes = [
      {
        id: 1,
        title: "First Task",
        description: "Pick Up Paycheck"
      }, {
        id: 2,
        title: "Second Task",
        description: "Cash Paycheck"
      }, {
        id: 3,
        title: "Third Task",
        description: "Get Some Milk"
      }
    ];
  });

  describe("INTEGRATION TESTS", () => {

    it("should render correctly", () => {
      const component = mount(<App/>);
      const tree = toJson(component)
      expect(tree).toMatchSnapshot()
    })

    it("UI should change to edit mode when edit mode is changed", () => {
      component = mount(<Note note={note}/>);
      component.setState({isEditing: true});

      //verify: a form has replaced the title and description with default value
      expect(component.find('.panel-title input')).toBeTruthy();
      expect(component.find('.panel-title input').node.value).toBe(note.title)
      expect(component.find('.panel-body textarea').node.value).toBe(note.description);
    })

    it("Should trigger toggleState when edit button is clicked & change state accordingly", () => {
      const toggleState = jest.spyOn(Note.prototype, 'toggleState');
      component = mount(<Note note={note}/>);
      component.find('.edit-button').simulate("click")
      expect(toggleState).toHaveBeenCalled()
    })

    it('Should create correctly in the state & show correctly on UI', () => {
      const component = mount(<App/>);
      var initialUiLength = component.find('.panel-title').length;
      var initialStateLength = component.state().notes.length;
      component.find('.note-title').node.value = "new title";
      component.find('.note-description').node.value = "new description";
      component.find('.create-note').simulate('click');

      const newNote = component.state().notes[component.state().notes.length - 1];
      expect(newNote.title).toBe("new title");
      expect(newNote.description).toBe("new description");

      expect(component.find('.panel-title').length).toBe(initialUiLength + 1); // Check if UI gets updated correctly
      expect(component.state().notes.length).toBe(initialStateLength + 1); // Check if state gets updated correctly
    })

    it('Should update correctly in the state & show correctly on UI', () => {
      const component = mount(<App/>);
      component.find('.edit-button').first().simulate('click'); // Simulate a click event
      expect(component.find('.save-button').length).toBe(1) // Save buttons should have appeared
      component.find('.panel-title input').node.value = "Changing the note!" // Simulate edit
      component.find('.save-button').simulate('click'); // Simulate a click event on the save button

      expect(component.find('.panel-title').first().text()).toBe("Changing the note!") // Check if text is set right on UI
      expect(component.state().notes[0].title).toBe("Changing the note!") // Check if text is set right in state
      expect(component.find('.save-button').length).toBe(0) // Save buttons should be gone
    })

    it('Should delete correctly in the state & show correctly on UI', () => {
      const component = mount(<App/>);
      var initialUiLength = component.find('.panel-title').length;
      var initialStateLength = component.state().notes.length;
      component.find('.delete-button').first().simulate('click'); // Simulate a click event
      expect(component.find('.panel-title').length).toBe(initialUiLength - 1); // Check if UI gets updated correctly
      expect(component.state().notes.length).toBe(initialStateLength - 1); // Check if state gets updated correctly
    })
  })

  describe("UNIT TESTS", () => {
    it('function findNote(id) should find the right note when given an id', () => {
      const component = mount(<App/>);
      component.setState({notes: notes});
      expect(component.instance().findNote(1)).toBe(notes[0]);
    })

    it('function findIndex(note) should retrieve the right index in the state', () => {
      const component = mount(<App/>);
      component.setState({notes: notes});
      expect(component.instance().findIndex(component.state().notes[2])).toBe(2);
    })

    it('function updateNote(newNote) should update the note correctly', () => {
      const component = mount(<App/>);
      component.setState({notes: notes});
      component.instance().updateNote(note);
      var index = component.instance().findIndex(note);
      expect(component.state().notes[index]).toBe(note);
    })
  })
});
