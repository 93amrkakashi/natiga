import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
  try {
    const { seating_no } = await request.json();
    const formData = new URLSearchParams();
    formData.append('seating_no', seating_no);

    const response = await fetch('https://natega.youm7.com/Home/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': '_ga=GA1.1.2025489188.1722950036; __gads=ID=9489f15c06ac099c:T=1722950209:RT=1722950209:S=ALNI_MaEiZD4NVFSKDUWy0lJsKCesxC9jA; __gpi=UID=00000ebbc05cedd1:T=1722950209:RT=1722950209:S=ALNI_MYwFqEbThAq3H7WRT1A_tzKUlZQug; __eoi=ID=fc36fdbaa4bd9d3c:T=1722950209:RT=1722950209:S=AA-AfjbIT7eCc2fQfxdnvtugzp9V; _ga_J7S2SZJ3N7=GS1.1.1722950036.1.1.1722950210.0.0.0; _ga_56XSY8ZTS3=GS1.1.1722950035.1.1.1722950210.0.0.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36',
        'Origin': 'https://natega.youm7.com',
        'Referer': 'https://natega.youm7.com/?s=1',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const $ = cheerio.load(data);

    const resultInfo = $('.result-info').html(); 
    const studentInfo = $('.full-result').html(); 

    const combinedContent = `
    <div class="halfinput-student">${studentInfo}</div>
      <div class="result-info">${resultInfo}</div>
    `;

    return new NextResponse(combinedContent, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}