import React from 'react';
import Form from './pages/Form';
import { FormProvider } from './context/FormContext';  // Make sure you're importing FormProvider

function App() {
    return (
        <FormProvider>  {/* Ensure the provider is wrapping the Form component */}
            <div className="App">
                <Form />
            </div>
        </FormProvider>
    );
}

export default App;
