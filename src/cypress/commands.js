import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
addMatchImageSnapshotCommand();

describe("اختبار بصرية للمكون Checkout", () => {
  it("يجب أن يكون المكون مطابقًا للصور", () => {
    cy.visit("/checkout"); // زيارة صفحة الدفع
    cy.get(".checkout-container").toMatchImageSnapshot();  // إجراء اختبار بصرية على المكون
  });
});
