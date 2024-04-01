import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  notes: Note[] = [];
  trash: Note[] = [];

  // items$;
  // items;

  unsubNotes;
  unsubTrash;
  // unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();

    // this.unsubSingle = onSnapshot(this.getSingleNote("notes", "MOTIcN1vMqzNHn5ELPu8"), (el) => {
    //   console.log(el);
    // });

    // this.items$ = collectionData(this.getNotesRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(el => {
    //     console.log(el);

    //   })
    // });
  }


  async deleteNote(colId: string, docId: string) {
    await deleteDoc(this.getSingleNote(colId, docId)).catch(
      (err) => { console.log(err); }
    )
  }

  async addNote(note: Note, colId: 'notes' | 'trash') {
    await addDoc(this.getNotesRef(colId), note)
      .catch((err) => {
        console.error(err);
      }
      ).then((docRef) => {
        console.log("Document written with ID", docRef!.id);
      });
  }

  async updateNote(note: Note) {
    if (note.id) {
      let docRef = this.getSingleNote(this.getColIdFromNote(note.type), note.id);
      await updateDoc(docRef, this.getCleanJson(note)).catch(
        (err) => { console.log(err); }
      );
    }
  }

  getCleanJson(note: Note): {} {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked,
    }
  }

  getColIdFromNote(noteType: string) {
    if (noteType == 'note') {
      return 'notes'
    } else {
      return 'trash'
    }
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef('notes'), (list) => {
      list.forEach(el => {
        this.notes.push(this.setNoteObj(el.data(), el.id));
      })
    });
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef('trash'), (list) => {
      list.forEach(el => {
        this.trash.push(this.setNoteObj(el.data(), el.id));
      })
    });
  }

  ngOnDestroy() {
    this.unsubNotes();
    this.unsubTrash();
    // this.unsubSingle();
    // this.items.unsubscribe();
  }

    (obj: any, id: string) {
    return {
      id: id,
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false
    }
  }

  getNotesRef(colId: string) {
    return collection(this.firestore, colId);
  }

  getTrashRef(colId: string) {
    return collection(this.firestore, colId);
  }

  getSingleNote(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
  