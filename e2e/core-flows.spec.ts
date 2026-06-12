import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/kaoyan';

test.describe('核心流程 E2E 测试', () => {

  test('首页加载正确', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('考研智能学习助手');
    await expect(page.locator('h1')).toContainText('考研助手');
    await expect(page.locator('text=问答')).toBeVisible();
  });

  test('学科切换按钮存在', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('button:has-text("数学")')).toBeVisible();
  });

  test('概念浏览页加载', async ({ page }) => {
    await page.goto(`${BASE_URL}/concepts`);
    await page.waitForTimeout(2000);
    await expect(page.locator('text=概念').first()).toBeVisible();
  });

  test('登录页加载', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator('text=登录')).toBeVisible();
    await expect(page.locator('text=去注册')).toBeVisible();
  });

  test('辅导页加载正确', async ({ page }) => {
    await page.goto(`${BASE_URL}/tutor`);
    await expect(page.locator('text=完整解析')).toBeVisible();
    await expect(page.locator('text=思路引导')).toBeVisible();
  });

  test('未登录时诊断页重定向到登录', async ({ page }) => {
    await page.goto(`${BASE_URL}/diagnosis`);
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/login');
  });

  test('辅导页可发送消息', async ({ page }) => {
    await page.goto(`${BASE_URL}/tutor`);
    const textarea = page.locator('textarea');
    await textarea.fill('什么是极限？');
    await page.locator('button:has-text("完整解析")').click();
    await page.waitForTimeout(2000);
    const messages = page.locator('.whitespace-pre-line');
    await expect(messages.first()).toBeVisible();
  });
});