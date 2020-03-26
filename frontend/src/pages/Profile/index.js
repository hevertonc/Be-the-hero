import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero" />
        <span>Bem vinda, {ongName}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>Caso:</strong>
            <p>{item.title}</p>
            <strong>Descrição:</strong>
            <p>{item.description}</p>
            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.value)}</p>
            <button type="button" onClick={() => handleDeleteIncident(item.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}