import { fetchJson } from './dataService';

describe('dataService.fetchJson', () => {
  it('devuelve el contenido del JSON cuando la respuesta es correcta', async () => {
    const datos = [{ id: 1 }];
    spyOn(window, 'fetch').and.resolveTo({ ok: true, json: () => Promise.resolve(datos) });

    const resultado = await fetchJson('data/prueba.json');

    expect(window.fetch).toHaveBeenCalledWith('data/prueba.json');
    expect(resultado).toEqual(datos);
  });

  it('lanza un error cuando la respuesta no es correcta', async () => {
    spyOn(window, 'fetch').and.resolveTo({ ok: false, status: 404 });

    await expectAsync(fetchJson('data/no-existe.json')).toBeRejectedWithError(/404/);
  });
});