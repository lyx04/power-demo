import { Rect } from '@topology/core';

export function MyShape(ctx) {
  ctx.beginPath();
  // ctx.fillStyle = "black"
  // ctx.moveTo(0, 50)
  // ctx.lineTo(50, 50)
  // ctx.stroke()
  // ctx.beginPath();
  // ctx.moveTo(50, 0)
  // ctx.lineTo(50, 100)
  // ctx.stroke()
  // ctx.beginPath();
  // ctx.moveTo(70,0)
  // ctx.lineTo(70,100)
  // ctx.stroke()
  // ctx.beginPath();
  // ctx.moveTo(70,50)
  // ctx.lineTo(120,50)
  // ctx.stroke()
}
export function myIconRect(node) {
  node.iconRect = new Rect(node.rect.x, node.rect.y + 10, node.rect.width, (node.rect.height * 2) / 3 - 20);
  node.fullIconRect = node.rect;
}
export function myTextRect(node) {
  node.textRect = new Rect(
    node.rect.x + 10,
    node.rect.y + (node.rect.height * 2) / 3,
    node.rect.width - 20,
    node.rect.height / 3 - 5
  );
  node.fullTextRect = node.rect;
}
// export function myAnchors(node) {
//   console.log(node)
//   node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
//   node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
//   // node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2, Direction.Right));
//   // node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));

//   // // demo，其他自定义锚点。这里只是示例。
//   // for (let i = 10; i < 360; i += 10) {
//   //   if (i % 90 === 0) {
//   //     continue;
//   //   }

//   //   const direction = Math.floor(i / 90);
//   //   const pt = new Point(
//   //     node.rect.center.x + (Math.sin((i / 180) * Math.PI) * node.rect.width) / 2,
//   //     node.rect.center.y + (Math.cos((i / 180) * Math.PI) * node.rect.height) / 2,
//   //     direction
//   //   );
//   //   pt.hidden = true;
//   //   node.anchors.push(pt);
//   // }
// }