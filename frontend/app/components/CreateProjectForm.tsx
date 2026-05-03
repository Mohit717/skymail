'use client'
import React, { useActionState } from 'react'
import { createProject } from '../actions/project'
import { toastError, toastSuccess } from '../lib/helper'

const CreateProjectForm = () => {
  const [showForm, setShowForm] = React.useState(false)
  const [state, action, pending] = useActionState(createProject, undefined)

  React.useEffect(() => {
    if(state?.errors && Object.keys(state.errors).length > 0) {
      if(state.errors.description){
        toastError(state.errors.description[0])
      }
      if(state.errors.name){
        toastError(state.errors.name[0])
      }
    }
    
    if (state?.message) {
      toastSuccess(state.message)
    }
  }, [state])

  return (
    <>
      {showForm ? (
        <form action={action}>
          <div className="form-group">
            <div className="input-group d-flex align-items-center">
              <input type="text" className="form-control form-control-sm" placeholder="Name" name="name" />
              <input type="text" className="form-control form-control-sm" placeholder="Description" name="description" />
              <div className="input-group-append">
                <button className="btn btn-sm btn-success ms-2" type="submit" disabled={pending}>
                  {pending ? "Saving..." : "+ Save Project"}
                </button>
                {!pending && (
                  <button className="btn btn-sm btn-danger ms-1" type="reset" onClick={() => setShowForm(false)} disabled={pending}>Cancel</button>
                )}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <button className="btn btn-sm btn-primary ms-2" type="button" onClick={() => setShowForm(true)}>+ New Project</button>
      )}
    </>
  )
}

export default CreateProjectForm