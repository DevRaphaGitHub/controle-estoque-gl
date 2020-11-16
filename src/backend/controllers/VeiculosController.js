import express from 'express';
import knex from '../database/connection.js';

class VeiculosController {
  async index(request, response) {
    const veiculos = await knex("veiculos").select("*");

    const arrayVeiculos = veiculos.map((veiculos) => {
      return {
        id: veiculos.id,
        modelo: veiculos.modelo,
        chassi: veiculos.chassi,
        placa: veiculos.placa,
        cor: veiculos.cor,
        km: veiculos.km,
        ano_fab: veiculos.ano_fab,
        ano_mod: veiculos.ano_mod,
        valor_venda: veiculos.valor_venda,
        revenda: veiculos.revenda,
        situacao: veiculos.situacao
      };
    });

    return response.json(arrayVeiculos);
  }
}

export default VeiculosController;