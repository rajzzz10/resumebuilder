import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const ProfSummary = ({ formData, handleChange }) => {
    const [jobRole, setJobRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    const generateSummaries = async (e) => {
        e.preventDefault();
        if (!jobRole.trim()) {
            setError('Please enter a job role first');
            return;
        }
    
        setIsLoading(true);
        setError('');
    
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [{
                        parts: [{
                            text: `Generate 3 different professional summaries for a ${jobRole} role. 
                                  Each summary should be unique, 3-4 sentences long, and highlight different aspects 
                                  of the role. Just return a JSON array of 3 strings, with no additional formatting or markdown.`
                        }]
                    }]
                }
            );
            
            try {
                let summariesText = response.data.candidates[0].content.parts[0].text;
                
                // Remove markdown formatting if present
                summariesText = summariesText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                
                console.log('Cleaned response:', summariesText); // For debugging
                
                const summariesArray = JSON.parse(summariesText);
                
                if (!Array.isArray(summariesArray) || summariesArray.length === 0) {
                    throw new Error('Invalid response format');
                }
                
                setSuggestions(summariesArray);
            } catch (parseError) {
                console.error('Raw response:', response.data.candidates[0].content.parts[0].text);
                console.error('Parse error:', parseError);
                setError('Invalid response format from AI service. Please try again.');
            }
            
        } catch (err) {
            console.error('API Error:', err.response?.data || err.message);
            setError(
                err.response?.data?.error?.message || 
                'Failed to generate summaries. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };
    const applySuggestion = (summary) => {
        handleChange('profSummary', 'summary', summary);
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div className="mb-4">
            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}
            
            <div className="d-flex gap-2 mb-3">
                <div className="form-floating flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        id="jobRoleInput"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        placeholder="Enter your job role"
                    />
                    <label htmlFor="jobRoleInput">Job Role </label>
                </div>
                <button
                    className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={generateSummaries}
                    disabled={isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Summaries'}
                </button>
            </div>

            {suggestions.length > 0 && (
                <div className="bg-light p-3 rounded mb-3">
                    <h5>AI Generated Suggestions:</h5>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-3 bg-white rounded border mb-2 cursor-pointer"
                            onClick={() => applySuggestion(suggestion)}
                            style={{ cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}

            <div className="form-floating">
                <textarea
                    className="form-control"
                    id="floatingTextarea"
                    rows="4"
                    style={{ height: "200px" }}
                    value={formData.summary || ""}
                    onChange={(e) => handleChange('profSummary', 'summary', e.target.value)}
                    placeholder="Enter your professional summary here"
                ></textarea>
                <label htmlFor="floatingTextarea">Professional Summary <span className='red'>*</span></label>
            </div>
        </div>
    );
};

export default ProfSummary;