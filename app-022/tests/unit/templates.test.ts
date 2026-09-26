import { describe, expect, it } from 'vitest';
import { TEMPLATES, worksheetFromTemplate } from '../../src/lib/templates';

describe('模板修复验证（临时）', () => {
  it('layoutPatch 被套用到字帖版式', () => {
    const name = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'name')!);
    expect(name.layout.cellMm).toBe(25);
    expect(name.layout.perLine).toBe(8);
    expect(name.layout.mix).toEqual({ model: 1, strokeSteps: 3, trace: 4, blank: 2 });

    const py = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'pinyin')!);
    expect(py.layout.grid).toBe('line');
    expect(py.layout.fourLine).toBe(true);

    const abc = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'abc')!);
    expect(abc.layout.grid).toBe('tian');
    expect(abc.layout.cellMm).toBe(20);
  });

  it('模板字帖不按笔画数重排，保持模板原顺序', () => {
    const g = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'grade1')!);
    expect(g.sortByStrokes).toBe(false);
    expect(g.chars.slice(0, 4)).toEqual(['一', '二', '三', '四']);
    expect(g.chars).toHaveLength(52);
  });

  it('英语字母数字模板含 0-9 数字', () => {
    const abc = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'abc')!);
    expect(abc.chars).toHaveLength(62);
    expect(abc.chars.slice(-10)).toEqual([...'0123456789']);
  });

  it('未打补丁的模板字段回落到默认值', () => {
    const poems = worksheetFromTemplate(TEMPLATES.find((t) => t.id === 'poems')!);
    expect(poems.layout.cellMm).toBe(20);
    expect(poems.layout.grid).toBe('tian');
    expect(poems.layout.show.pinyin).toBe(true);
  });
});
